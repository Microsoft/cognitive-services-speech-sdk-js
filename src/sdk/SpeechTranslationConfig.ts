// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { OutputFormatPropertyName } from "../common.speech/Exports";
import { Contracts } from "./Contracts";
import { OutputFormat, PropertyCollection, PropertyId, SpeechConfig } from "./Exports";

/**
 * Speech translation configuration.
 * @class SpeechTranslationConfig
 */
export abstract class SpeechTranslationConfig extends SpeechConfig {

    /**
     * Creates an instance of recognizer config.
     */
    protected constructor() {
        super();
    }

    /**
     * Static instance of SpeechTranslationConfig returned by passing a subscription key and service region.
     * @member SpeechTranslationConfig.fromSubscription
     * @function
     * @public
     * @param {string} subscriptionKey - The subscription key.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechTranslationConfig} The speech translation config.
     */
    public static fromSubscription(subscriptionKey: string, region: string): SpeechTranslationConfig {
        Contracts.throwIfNullOrWhitespace(subscriptionKey, "subscriptionKey");
        Contracts.throwIfNullOrWhitespace(region, "region");

        const ret: SpeechTranslationConfigImpl = new SpeechTranslationConfigImpl();
        ret.properties.setProperty(PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        ret.properties.setProperty(PropertyId.SpeechServiceConnection_Region, region);
        return ret;
    }

    /**
     * Static instance of SpeechTranslationConfig returned by passing authorization token and service region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     *       expires, the caller needs to refresh it by setting the property authorizationToken with a new
     *       valid token. Otherwise, all the recognizers created by this SpeechTranslationConfig instance
     *      will encounter errors during recognition.
     * @member SpeechTranslationConfig.fromAuthorizationToken
     * @function
     * @public
     * @param {string} authorizationToken - The authorization token.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechTranslationConfig} The speech translation config.
     */
    public static fromAuthorizationToken(authorizationToken: string, region: string): SpeechTranslationConfig {
        Contracts.throwIfNullOrWhitespace(authorizationToken, "authorizationToken");
        Contracts.throwIfNullOrWhitespace(region, "region");

        const ret: SpeechTranslationConfigImpl = new SpeechTranslationConfigImpl();
        ret.properties.setProperty(PropertyId.SpeechServiceAuthorization_Token, authorizationToken);
        ret.properties.setProperty(PropertyId.SpeechServiceConnection_Region, region);
        return ret;
    }

    /**
     * Creates an instance of the speech translation config with specified endpoint and subscription key.
     * This method is intended only for users who use a non-standard service endpoint or paramters.
     * Note: The query properties specified in the endpoint URL are not changed, even if they are
     *       set by any other APIs. For example, if language is defined in the uri as query parameter
     *       "language=de-DE", and also set by the speechRecognitionLanguage property, the language
     *       setting in uri takes precedence, and the effective language is "de-DE".
     * Only the properties that are not specified in the endpoint URL can be set by other APIs.
     * @member SpeechTranslationConfig.fromEndpoint
     * @function
     * @public
     * @param {URL} endpoint - The service endpoint to connect to.
     * @param {string} subscriptionKey - The subscription key.
     * @returns {SpeechTranslationConfig} A speech config instance.
     */
    public static fromEndpoint(endpoint: URL, subscriptionKey: string): SpeechTranslationConfig {
        Contracts.throwIfNull(endpoint, "endpoint");
        Contracts.throwIfNullOrWhitespace(subscriptionKey, "subscriptionKey");

        const ret: SpeechTranslationConfigImpl = new SpeechTranslationConfigImpl();
        ret.properties.setProperty(PropertyId.SpeechServiceConnection_Endpoint, endpoint.href);
        ret.properties.setProperty(PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        return ret;
    }

    /**
     * Sets the authorization token.
     * If this is set, subscription key is ignored.
     * User needs to make sure the provided authorization token is valid and not expired.
     * @member SpeechTranslationConfig.prototype.authorizationToken
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    public abstract set authorizationToken(value: string);

    /**
     * Sets the authorization token.
     * If this is set, subscription key is ignored.
     * User needs to make sure the provided authorization token is valid and not expired.
     * @member SpeechTranslationConfig.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    public abstract set speechRecognitionLanguage(value: string);

    /**
     * Add a (text) target language to translate into.
     * @member SpeechTranslationConfig.prototype.addTargetLanguage
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    public abstract addTargetLanguage(value: string): void;

    /**
     * Add a (text) target language to translate into.
     * @member SpeechTranslationConfig.prototype.targetLanguages
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    public abstract get targetLanguages(): string[];

    /**
     * Returns the selected voice name.
     * @member SpeechTranslationConfig.prototype.voiceName
     * @function
     * @public
     * @returns {string} The voice name.
     */
    public abstract get voiceName(): string;

    /**
     * Sets voice of the translated language, enable voice synthesis output.
     * @member SpeechTranslationConfig.prototype.voiceName
     * @function
     * @public
     * @param {string} value - The name of the voice.
     */
    public abstract set voiceName(value: string);

    /**
     * Sets a named property as value
     * @member SpeechTranslationConfig.prototype.setProperty
     * @function
     * @public
     * @param {string} name - The name of the property.
     * @param {string} value - The value.
     */
    public abstract setProperty(name: string, value: string): void;

    /**
     * Dispose of associated resources.
     * @member SpeechTranslationConfig.prototype.close
     * @function
     * @public
     */
    public abstract close(): void;
}

/**
 * @private
 * @class SpeechTranslationConfigImpl
 */
// tslint:disable-next-line:max-classes-per-file
export class SpeechTranslationConfigImpl extends SpeechTranslationConfig {
    private privSpeechProperties: PropertyCollection;

    public constructor() {
        super();
        this.privSpeechProperties = new PropertyCollection();
        this.outputFormat = OutputFormat.Simple;
    }
    /**
     * Sets the authorization token.
     * If this is set, subscription key is ignored.
     * User needs to make sure the provided authorization token is valid and not expired.
     * @member SpeechTranslationConfigImpl.prototype.authorizationToken
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    public set authorizationToken(value: string) {
        Contracts.throwIfNullOrWhitespace(value, "value");

        this.privSpeechProperties.setProperty(PropertyId.SpeechServiceAuthorization_Token, value);
    }

    /**
     * Sets the authorization token.
     * If this is set, subscription key is ignored.
     * User needs to make sure the provided authorization token is valid and not expired.
     * @member SpeechTranslationConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The authorization token.
     */
    public set speechRecognitionLanguage(value: string) {
        Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechProperties.setProperty(PropertyId.SpeechServiceConnection_RecoLanguage, value);
    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.subscriptionKey
     * @function
     * @public
     */
    public get subscriptionKey(): string {
        return this.privSpeechProperties.getProperty(PropertyId[PropertyId.SpeechServiceConnection_Key]);
    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.outputFormat
     * @function
     * @public
     */
    public get outputFormat(): OutputFormat {
        return (OutputFormat as any)[this.privSpeechProperties.getProperty(OutputFormatPropertyName, undefined)];
    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.outputFormat
     * @function
     * @public
     */
    public set outputFormat(value: OutputFormat) {
        this.privSpeechProperties.setProperty(OutputFormatPropertyName, OutputFormat[value]);
    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.endpointId
     * @function
     * @public
     */
    public set endpointId(value: string) {
        this.privSpeechProperties.setProperty(PropertyId.SpeechServiceConnection_Endpoint, value);
    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.endpointId
     * @function
     * @public
     */
    public get endpointId(): string {
        return this.privSpeechProperties.getProperty(PropertyId.SpeechServiceConnection_EndpointId);
    }
    /**
     * Add a (text) target language to translate into.
     * @member SpeechTranslationConfigImpl.prototype.addTargetLanguage
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    public addTargetLanguage(value: string): void {
        Contracts.throwIfNullOrWhitespace(value, "value");

        const languages: string[] = this.targetLanguages;
        languages.push(value);
        this.privSpeechProperties.setProperty(PropertyId.SpeechServiceConnection_TranslationToLanguages, languages.join(","));
    }

    /**
     * Add a (text) target language to translate into.
     * @member SpeechTranslationConfigImpl.prototype.targetLanguages
     * @function
     * @public
     * @param {string} value - The language such as de-DE
     */
    public get targetLanguages(): string[] {

        if (this.privSpeechProperties.getProperty(PropertyId.SpeechServiceConnection_TranslationToLanguages, undefined) !== undefined) {
            return this.privSpeechProperties.getProperty(PropertyId.SpeechServiceConnection_TranslationToLanguages).split(",");
        } else {
            return [];
        }

    }

    /**
     * @member SpeechTranslationConfigImpl.prototype.voiceName
     * @function
     * @public
     */
    public get voiceName(): string {
        return this.getProperty(PropertyId[PropertyId.SpeechServiceConnection_TranslationVoice]);
    }

    /**
     * Sets voice of the translated language, enable voice synthesis output.
     * @member SpeechTranslationConfigImpl.prototype.voiceName
     * @function
     * @public
     * @param {string} value - The name of the voice.
     */
    public set voiceName(value: string) {
        Contracts.throwIfNullOrWhitespace(value, "value");

        this.privSpeechProperties.setProperty(PropertyId.SpeechServiceConnection_TranslationVoice, value);
    }

    /**
     * Provides the region.
     * @member SpeechTranslationConfigImpl.prototype.region
     * @function
     * @public
     * @returns {string} The region.
     */
    public get region(): string {
        return this.privSpeechProperties.getProperty(PropertyId.SpeechServiceConnection_Region);
    }

    /**
     * Allows for setting arbitrary properties.
     * @member SpeechTranslationConfigImpl.prototype.setProperty
     * @function
     * @public
     * @param {string} name - The name of the property.
     * @param {string} value - The value of the property.
     */
    public setProperty(name: string, value: string): void {
        this.privSpeechProperties.setProperty(name, value);
    }

    /**
     * Allows for retrieving arbitrary property values.
     * @member SpeechTranslationConfigImpl.prototype.getProperty
     * @function
     * @public
     * @param {string} name - The name of the property.
     * @param {string} def - The default value of the property in case it is not set.
     * @returns {string} The value of the property.
     */
    public getProperty(name: string, def?: string): string {
        return this.privSpeechProperties.getProperty(name, def);
    }

    /**
     * Provides access to custom properties.
     * @member SpeechTranslationConfigImpl.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The properties.
     */
    public get properties(): PropertyCollection {
        return this.privSpeechProperties;
    }

    /**
     * Dispose of associated resources.
     * @member SpeechTranslationConfigImpl.prototype.close
     * @function
     * @public
     */
    public close(): void {
        return;
    }
}
