// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
    ProxyInfo,
    WebsocketConnection,
} from "../common.browser/Exports";
import { OutputFormatPropertyName } from "../common.speech/Exports";
import { IConnection, IStringDictionary } from "../common/Exports";
import { OutputFormat, PropertyId } from "../sdk/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig, WebsocketMessageFormatter } from "./Exports";
import { QueryParameterNames } from "./QueryParameterNames";

const baseUrl: string = "convai.speech.microsoft.com";

interface IBackendValues {
    authHeader: string;
    resourcePath: string;
    version: string;
}

const botFramework: IBackendValues = {
    authHeader: "X-DLS-Secret",
    resourcePath: "",
    version: "v3"
};

const customCommands: IBackendValues = {
    authHeader: "X-CommandsAppId",
    resourcePath: "commands",
    version: "v1"
};

const pathSuffix: string = "api";

function getDialogSpecificValues(dialogType: string): IBackendValues {
    switch (dialogType) {
        case "custom_commands": {
            return customCommands;
        }
        case "bot_framework": {
            return botFramework;
        }
    }
    throw new Error(`Invalid dialog type '${dialogType}'`);
}

export class DialogConnectionFactory extends ConnectionFactoryBase {

    public create = (
        config: RecognizerConfig,
        authInfo: AuthInfo,
        connectionId?: string): IConnection => {

        const applicationId: string = config.parameters.getProperty(PropertyId.Conversation_ApplicationId, "");
        const dialogType: string = config.parameters.getProperty(PropertyId.Conversation_DialogType);
        const region: string = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region);

        const language: string = config.parameters.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");

        const queryParams: IStringDictionary<string> = {};
        queryParams[QueryParameterNames.LanguageParamName] = language;
        queryParams[QueryParameterNames.FormatParamName] = config.parameters.getProperty(PropertyId.SpeechServiceResponse_OutputFormatOption, OutputFormat[OutputFormat.Simple]).toLowerCase();

        const {resourcePath, version, authHeader} = getDialogSpecificValues(dialogType);

        const headers: IStringDictionary<string> = {};

        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[QueryParameterNames.ConnectionIdHeader] = connectionId;

        let endpoint: string;
        // ApplicationId is only required for CustomCommands
        if (applicationId === "") {
            endpoint = `wss://${region}.${baseUrl}/${pathSuffix}/${version}`;
        } else {
            endpoint = `wss://${region}.${baseUrl}/${resourcePath}/${pathSuffix}/${version}`;
            headers[authHeader] = applicationId;
        }

        this.setCommonUrlParams(config, queryParams, endpoint);

        return new WebsocketConnection(endpoint, queryParams, headers, new WebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), connectionId);
    }
}
