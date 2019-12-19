// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Contracts } from "./Contracts";
import { PropertyCollection, PropertyId, ServicePropertyChannel, SpeechConfigImpl } from "./Exports";

/**
 * Class that defines base configurations for dialog service connector
 * @class DialogServiceConfig
 */
export abstract class DialogServiceConfig {

    /**
     * Creates an instance of DialogService config.
     * @constructor
     */
    protected constructor() { }

    /**
     * Sets an arbitrary property.
     * @member DialogServiceConfig.prototype.setProperty
     * @function
     * @public
     * @param {string} name - The name of the property to set.
     * @param {string} value - The new value of the property.
     */
    public abstract setProperty(name: string, value: string): void;

    /**
     * Returns the current value of an arbitrary property.
     * @member DialogServiceConfig.prototype.getProperty
     * @function
     * @public
     * @param {string} name - The name of the property to query.
     * @param {string} def - The value to return in case the property is not known.
     * @returns {string} The current value, or provided default, of the given property.
     */
    public abstract getProperty(name: string, def?: string): string;

    /**
     * @member DialogServiceConfig.prototype.setServiceProperty
     * @function
     * @public
     * @param {name} The name of the property.
     * @param {value} Value to set.
     * @param {channel} The channel used to pass the specified property to service.
     * @summary Sets a property value that will be passed to service using the specified channel.
     */
    public abstract setServiceProperty(name: string, value: string, channel: ServicePropertyChannel): void;

    /**
     * Sets the proxy configuration.
     * Only relevant in Node.js environments.
     * Added in version 1.4.0.
     * @param proxyHostName The host name of the proxy server.
     * @param proxyPort The port number of the proxy server.
     */
    public abstract setProxy(proxyHostName: string, proxyPort: number): void;

    /**
     * Sets the proxy configuration.
     * Only relevant in Node.js environments.
     * Added in version 1.4.0.
     * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
     * @param porxyPort The port number of the proxy server.
     * @param proxyUserName The user name of the proxy server.
     * @param proxyPassword The password of the proxy server.
     */
    public abstract setProxy(proxyHostName: string, proxyPort: number, proxyUserName: string, proxyPassword: string): void;

    /**
     * Returns the configured language.
     * @member DialogServiceConfig.prototype.speechRecognitionLanguage
     * @function
     * @public
     */
    public abstract get speechRecognitionLanguage(): string;

    /**
     * Gets/Sets the input language.
     * @member DialogServiceConfig.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The language to use for recognition.
     */
    public abstract set speechRecognitionLanguage(value: string);

    /**
     * Not used in DialogServiceConfig
     * @member DialogServiceConfig.applicationId
     */
    public applicationId: string;
}

/**
 * Dialog Service configuration.
 * @class DialogServiceConfigImpl
 */
// tslint:disable-next-line:max-classes-per-file
export class DialogServiceConfigImpl extends DialogServiceConfig {

    private privSpeechConfig: SpeechConfigImpl;

    /**
     * Creates an instance of dialogService config.
     */
    public constructor() {
        super();
        this.privSpeechConfig = new SpeechConfigImpl();
    }

    /**
     * Provides access to custom properties.
     * @member DialogServiceConfigImpl.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The properties.
     */
    public get properties(): PropertyCollection {
        return this.privSpeechConfig.properties;
    }

    /**
     * Gets the speech recognition language.
     * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     */
    public get speechRecognitionLanguage(): string {
        return this.privSpeechConfig.speechRecognitionLanguage;
    }

    /**
     * Sets the speech recognition language.
     * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
     * @function
     * @public
     * @param {string} value - The language to set.
     */
    public set speechRecognitionLanguage(value: string) {
        Contracts.throwIfNullOrWhitespace(value, "value");
        this.privSpeechConfig.speechRecognitionLanguage = value;
    }

    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.setProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to set.
     * @param {string} value - The value.
     */
    public setProperty(name: string | PropertyId, value: string): void {
        this.privSpeechConfig.setProperty(name, value);
    }

    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.getProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to get.
     * @param {string} def - The default value to return in case the property is not known.
     * @returns {string} The current value, or provided default, of the given property.
     */
    public getProperty(name: string | PropertyId, def?: string): string {
        return this.privSpeechConfig.getProperty(name);
    }

    /**
     * Sets the proxy configuration.
     * Only relevant in Node.js environments.
     * Added in version 1.4.0.
     * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
     * @param proxyPort The port number of the proxy server.
     * @param proxyUserName The user name of the proxy server.
     * @param proxyPassword The password of the proxy server.
     */
    public setProxy(proxyHostName: string, proxyPort: number, proxyUserName?: string, proxyPassword?: string): void {
        this.setProperty(PropertyId.SpeechServiceConnection_ProxyHostName, proxyHostName);
        this.setProperty(PropertyId.SpeechServiceConnection_ProxyPort, `${proxyPort}`);
        if (proxyUserName) {
            this.setProperty(PropertyId.SpeechServiceConnection_ProxyUserName, proxyUserName);
        }
        if (proxyPassword) {
            this.setProperty(PropertyId.SpeechServiceConnection_ProxyPassword, proxyPassword);
        }
    }

    public setServiceProperty(name: string, value: string, channel: ServicePropertyChannel): void {
        this.privSpeechConfig.setServiceProperty(name, value, channel);
    }

    /**
     * Dispose of associated resources.
     * @member DialogServiceConfigImpl.prototype.close
     * @function
     * @public
     */
    public close(): void {
        return;
    }
}
