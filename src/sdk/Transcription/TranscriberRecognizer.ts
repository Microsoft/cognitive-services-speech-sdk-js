// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
    IAuthentication,
    IConnectionFactory,
    RecognitionMode,
    RecognizerConfig,
    ServiceRecognizerBase,
    SpeechServiceConfig,
    TranscriberConnectionFactory,
    TranscriptionServiceRecognizer,
} from "../../common.speech/Exports";
import { marshalPromiseToCallbacks } from "../../common/Exports";
import { AudioConfigImpl } from "../Audio/AudioConfig";
import { Contracts } from "../Contracts";
import {
    AudioConfig,
    CancellationEventArgs,
    PropertyCollection,
    PropertyId,
    Recognizer,
    SpeechRecognitionEventArgs,
    SpeechTranslationConfig,
    SpeechTranslationConfigImpl,
} from "../Exports";
import { Conversation } from "./Conversation";
import { ConversationInfo } from "./IConversation";

export class TranscriberRecognizer extends Recognizer {
    private privDisposedRecognizer: boolean;
    private privConversation: Conversation;

    /**
     * ConversationTranscriber constructor.
     * @constructor
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    public constructor(speechTranslationConfig: SpeechTranslationConfig, audioConfig?: AudioConfig) {
        const speechTranslationConfigImpl: SpeechTranslationConfigImpl = speechTranslationConfig as SpeechTranslationConfigImpl;
        Contracts.throwIfNull(speechTranslationConfigImpl, "speechTranslationConfig");

        Contracts.throwIfNullOrWhitespace(
            speechTranslationConfigImpl.speechRecognitionLanguage,
            PropertyId[PropertyId.SpeechServiceConnection_RecoLanguage]);

        super(audioConfig, speechTranslationConfigImpl.properties, new TranscriberConnectionFactory());
        this.privDisposedRecognizer = false;
    }

    public recognizing: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;

    public recognized: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;

    public canceled: (sender: Recognizer, event: CancellationEventArgs) => void;

    public getConversationInfo(): ConversationInfo {
        Contracts.throwIfNullOrUndefined(this.privConversation, "Conversation");
        return this.privConversation.conversationInfo;
    }

    public get authorizationToken(): string {
        return this.properties.getProperty(PropertyId.SpeechServiceAuthorization_Token);
    }

    public set authorizationToken(token: string) {
        Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(PropertyId.SpeechServiceAuthorization_Token, token);
    }

    public set conversation(c: Conversation) {
        Contracts.throwIfNullOrUndefined(c, "Conversation");
        this.privConversation = c;
    }

    public get speechRecognitionLanguage(): string {
        Contracts.throwIfDisposed(this.privDisposedRecognizer);

        return this.properties.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage);
    }

    public get properties(): PropertyCollection {
        return this.privProperties;
    }

    public startContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void {
        marshalPromiseToCallbacks(this.startContinuousRecognitionAsyncImpl(RecognitionMode.Conversation), cb, err);
    }

    public stopContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void {
        marshalPromiseToCallbacks(this.stopContinuousRecognitionAsyncImpl(), cb, err);
    }

    public async close(): Promise<void> {
        Contracts.throwIfDisposed(this.privDisposedRecognizer);
        await this.dispose(true);
    }

    // Push async join/leave conversation message via serviceRecognizer
    public async pushConversationEvent(conversationInfo: ConversationInfo, command: string): Promise<void> {
        const reco = (this.privReco) as TranscriptionServiceRecognizer;
        Contracts.throwIfNullOrUndefined(reco, "serviceRecognizer");
        await reco.sendSpeechEventAsync(conversationInfo, command);
    }

    /**
     * Disposes any resources held by the object.
     * @member ConversationTranscriber.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    protected async dispose(disposing: boolean): Promise<void> {
        if (this.privDisposedRecognizer) {
            return;
        }

        if (disposing) {
            this.privDisposedRecognizer = true;
            await this.implRecognizerStop();
        }

        await super.dispose(disposing);
    }

    protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig {
        return new RecognizerConfig(
            speechConfig,
            this.properties);
    }

    protected createServiceRecognizer(
        authentication: IAuthentication,
        connectionFactory: IConnectionFactory,
        audioConfig: AudioConfig,
        recognizerConfig: RecognizerConfig): ServiceRecognizerBase {
        const configImpl: AudioConfigImpl = audioConfig as AudioConfigImpl;
        return new TranscriptionServiceRecognizer(authentication, connectionFactory, configImpl, recognizerConfig, this);
    }
}
