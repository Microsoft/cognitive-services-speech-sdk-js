// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
    IAudioSource,
    IConnection,
    MessageType,
} from "../common/Exports";
import {
    CancellationErrorCode,
    CancellationReason,
    DialogServiceConnector,
    PropertyCollection,
    PropertyId,
    ResultReason,
    SpeechRecognitionEventArgs,
    SpeechRecognitionResult,
} from "../sdk/Exports";
import {
    CancellationErrorCodePropertyName,
    EnumTranslation,
    RecognitionStatus,
    ServiceRecognizerBase,
    SimpleSpeechPhrase,
    SpeechHypothesis,
} from "./Exports";
import { IAuthentication } from "./IAuthentication";
import { IConnectionFactory } from "./IConnectionFactory";
import { RecognizerConfig } from "./RecognizerConfig";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";

export class DialogServiceAdapter extends ServiceRecognizerBase {
    private privDialogServiceConnector: DialogServiceConnector;

    public constructor(
        authentication: IAuthentication,
        connectionFactory: IConnectionFactory,
        audioSource: IAudioSource,
        recognizerConfig: RecognizerConfig,
        dialogServiceConnector: DialogServiceConnector) {

        super(authentication, connectionFactory, audioSource, recognizerConfig, dialogServiceConnector);
        this.privDialogServiceConnector = dialogServiceConnector;
    }

    protected processTypeSpecificMessages(
        connectionMessage: SpeechConnectionMessage,
        successCallback?: (e: SpeechRecognitionResult) => void,
        errorCallBack?: (e: string) => void): void {

        const resultProps: PropertyCollection = new PropertyCollection();
        if (connectionMessage.messageType === MessageType.Text) {
            resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }

        let result: SpeechRecognitionResult;

        switch (connectionMessage.path.toLowerCase()) {
            case "speech.phrase":
                const speechPhrase: SimpleSpeechPhrase = SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);

                this.privRequestSession.onPhraseRecognized(this.privRequestSession.currentTurnAudioOffset + speechPhrase.Offset + speechPhrase.Duration);

                if (speechPhrase.RecognitionStatus === RecognitionStatus.Success) {
                    const args: SpeechRecognitionEventArgs = this.fireEventForResult(speechPhrase, resultProps);
                    if (!!this.privDialogServiceConnector.recognized) {
                        try {
                            this.privDialogServiceConnector.recognized(this.privDialogServiceConnector, args);
                            /* tslint:disable:no-empty */
                        } catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }

                    // report result to promise.
                    if (!!successCallback) {
                        try {
                            successCallback(args.result);
                        } catch (e) {
                            if (!!errorCallBack) {
                                errorCallBack(e);
                            }
                        }
                        // Only invoke the call back once.
                        // and if it's successful don't invoke the
                        // error after that.
                        successCallback = undefined;
                        errorCallBack = undefined;
                    }
                }
                break;
            case "speech.hypothesis":
                    const hypothesis: SpeechHypothesis = SpeechHypothesis.fromJSON(connectionMessage.textBody);
                    const offset: number = hypothesis.Offset + this.privRequestSession.currentTurnAudioOffset;

                    result = new SpeechRecognitionResult(
                        this.privRequestSession.requestId,
                        ResultReason.RecognizingSpeech,
                        hypothesis.Text,
                        hypothesis.Duration,
                        offset,
                        undefined,
                        connectionMessage.textBody,
                        resultProps);

                    this.privRequestSession.onHypothesis(offset);

                    const ev = new SpeechRecognitionEventArgs(result, hypothesis.Duration, this.privRequestSession.sessionId);

                    if (!!this.privDialogServiceConnector.recognizing) {
                        try {
                            this.privDialogServiceConnector.recognizing(this.privDialogServiceConnector, ev);
                            /* tslint:disable:no-empty */
                        } catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }
                    break;
            default:
                break;
        }
    }

    // Cancels recognition.
    protected cancelRecognition(
        sessionId: string,
        requestId: string,
        cancellationReason: CancellationReason,
        errorCode: CancellationErrorCode,
        error: string,
        cancelRecoCallback: (e: SpeechRecognitionResult) => void): void {
        return;
    //     if (!!this.privTranslationRecognizer.canceled) {
    //         const properties: PropertyCollection = new PropertyCollection();
    //         properties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[errorCode]);

    //         const cancelEvent: TranslationRecognitionCanceledEventArgs = new TranslationRecognitionCanceledEventArgs(
    //             sessionId,
    //             cancellationReason,
    //             error,
    //             errorCode,
    //             undefined);

    //         try {
    //             this.privTranslationRecognizer.canceled(this.privTranslationRecognizer, cancelEvent);
    //             /* tslint:disable:no-empty */
    //         } catch { }

    //         if (!!cancelRecoCallback) {
    //             const result: TranslationRecognitionResult = new TranslationRecognitionResult(
    //                 undefined, // Translations
    //                 requestId,
    //                 ResultReason.Canceled,
    //                 undefined, // Text
    //                 undefined, // Druation
    //                 undefined, // Offset
    //                 error,
    //                 undefined, // Json
    //                 properties);
    //             try {
    //                 cancelRecoCallback(result);
    //                 /* tslint:disable:no-empty */
    //             } catch { }
    //         }
    //     }
    }

    private fireEventForResult(serviceResult: SimpleSpeechPhrase, properties: PropertyCollection): SpeechRecognitionEventArgs {
        const resultReason: ResultReason = EnumTranslation.implTranslateRecognitionResult(serviceResult.RecognitionStatus);

        const offset: number = serviceResult.Offset + this.privRequestSession.currentTurnAudioOffset;

        const result = new SpeechRecognitionResult(
            this.privRequestSession.requestId,
            resultReason,
            serviceResult.DisplayText,
            serviceResult.Duration,
            offset,
            undefined,
            JSON.stringify(serviceResult),
            properties);

        const ev = new SpeechRecognitionEventArgs(result, offset, this.privRequestSession.sessionId);
        return ev;
    }

    // private sendSynthesisAudio(audio: ArrayBuffer, sessionId: string): void {
    //     const reason = (undefined === audio) ? ResultReason.SynthesizingAudioCompleted : ResultReason.SynthesizingAudio;
    //     const result = new TranslationSynthesisResult(reason, audio);
    //     const retEvent: TranslationSynthesisEventArgs = new TranslationSynthesisEventArgs(result, sessionId);

    //     if (!!this.privTranslationRecognizer.synthesizing) {
    //         try {
    //             this.privTranslationRecognizer.synthesizing(this.privTranslationRecognizer, retEvent);
    //             /* tslint:disable:no-empty */
    //         } catch (error) {
    //             // Not going to let errors in the event handler
    //             // trip things up.
    //         }
    //     }

    // }
}
