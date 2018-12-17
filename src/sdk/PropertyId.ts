// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Defines speech property ids.
 * @class PropertyId
 */
export enum PropertyId {

    /**
     * The Cognitive Services Speech Service subscription Key. If you are using an intent recognizer, you need to specify
     * to specify the LUIS endpoint key for your particular LUIS app. Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use @see SpeechConfig.fromSubscription.
     * @member PropertyId.SpeechServiceConnection_Key
     */
    SpeechServiceConnection_Key = 0,

    /**
     * The Cognitive Services Speech Service endpoint (url). Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use @see SpeechConfig.fromEndpoint.
     * NOTE: This endpoint is not the same as the endpoint used to obtain an access token.
     * @member PropertyId.SpeechServiceConnection_Endpoint
     */
    SpeechServiceConnection_Endpoint,

    /**
     * The Cognitive Services Speech Service region. Under normal circumstances, you shouldn't have to
     * use this property directly.
     * Instead, use @see SpeechConfig.fromSubscription, @see SpeechConfig.fromEndpoint, @see SpeechConfig.fromAuthorizationToken.
     * @member PropertyId.SpeechServiceConnection_Region
     */
    SpeechServiceConnection_Region,

    /**
     * The Cognitive Services Speech Service authorization token (aka access token). Under normal circumstances,
     * you shouldn't have to use this property directly.
     * Instead, use @see SpeechConfig.fromAuthorizationToken,
     * @see SpeechRecognizer.setAuthorizationToken, @see IntentRecognizer.setAuthorizationToken, @see TranslationRecognizer.setAuthorizationToken.
     * @member PropertyId.SpeechServiceAuthorization_Token
     */
    SpeechServiceAuthorization_Token,

    /**
     * The Cognitive Services Speech Service authorization type. Currently unused.
     * @member PropertyId.SpeechServiceAuthorization_Type
     */
    SpeechServiceAuthorization_Type,

    /**
     * The Cognitive Services Custom Speech Service endpoint id. Under normal circumstances, you shouldn't
     * have to use this property directly.
     * Instead, use @see SpeechConfig.setEndpointId.
     * NOTE: The endpoint id is available in the Custom Speech Portal, listed under Endpoint Details.
     * @member PropertyId.SpeechServiceConnection_EndpointId
     */
    SpeechServiceConnection_EndpointId,

    /**
     * The list of comma separated languages (BCP-47 format) used as target translation languages. Under normal circumstances,
     * you shouldn't have to use this property directly.
     * Instead use @see SpeechTranslationConfig.addTargetLanguage,
     * @see SpeechTranslationConfig.getTargetLanguages, @see TranslationRecognizer.getTargetLanguages.
     * @member PropertyId.SpeechServiceConnection_TranslationToLanguages
     */
    SpeechServiceConnection_TranslationToLanguages,

    /**
     * The name of the Cognitive Service Text to Speech Service Voice. Under normal circumstances, you shouldn't have to use this
     * property directly.
     * Instead, use @see SpeechTranslationConfig.setVoiceName.
     * NOTE: Valid voice names can be found <a href="https://aka.ms/csspeech/voicenames">here</a>.
     * @member PropertyId.SpeechServiceConnection_TranslationVoice
     */
    SpeechServiceConnection_TranslationVoice,

    /**
     * Translation features.
     * @member PropertyId.SpeechServiceConnection_TranslationFeatures
     */
    SpeechServiceConnection_TranslationFeatures,

    /**
     * The Language Understanding Service Region. Under normal circumstances, you shouldn't have to use this property directly.
     * Instead, use @see LanguageUnderstandingModel.
     * @member PropertyId.SpeechServiceConnection_IntentRegion
     */
    SpeechServiceConnection_IntentRegion,

    /**
     * The Cognitive Services Speech Service recognition Mode. Can be "INTERACTIVE", "CONVERSATION", "DICTATION".
     * This property is intended to be read-only. The SDK is using it internally.
     * @member PropertyId.SpeechServiceConnection_RecoMode
     */
    SpeechServiceConnection_RecoMode,

    /**
     * The spoken language to be recognized (in BCP-47 format). Under normal circumstances, you shouldn't have to use this property
     * directly.
     * Instead, use @see SpeechConfig.setSpeechRecognitionLanguage.
     * @member PropertyId.SpeechServiceConnection_RecoLanguage
     */
    SpeechServiceConnection_RecoLanguage,

    /**
     * The session id. This id is a universally unique identifier (aka UUID) representing a specific binding of an audio input stream
     * and the underlying speech recognition instance to which it is bound. Under normal circumstances, you shouldn't have to use this
     * property directly.
     * Instead use @see SessionEventArgs.sessionId.
     * @member PropertyId.Speech_SessionId
     */
    Speech_SessionId,

    /**
     * The requested Cognitive Services Speech Service response output format (simple or detailed). Under normal circumstances, you shouldn't have
     * to use this property directly.
     * Instead use @see SpeechConfig.setOutputFormat.
     * @member PropertyId.SpeechServiceResponse_RequestDetailedResultTrueFalse
     */
    SpeechServiceResponse_RequestDetailedResultTrueFalse,

    /**
     * The requested Cognitive Services Speech Service response output profanity level. Currently unused.
     * @member PropertyId.SpeechServiceResponse_RequestProfanityFilterTrueFalse
     */
    SpeechServiceResponse_RequestProfanityFilterTrueFalse,

    /**
     * The Cognitive Services Speech Service response output (in JSON format). This property is available on recognition result objects only.
     * @member PropertyId.SpeechServiceResponse_JsonResult
     */
    SpeechServiceResponse_JsonResult,

    /**
     * The Cognitive Services Speech Service error details (in JSON format). Under normal circumstances, you shouldn't have to
     * use this property directly. Instead use @see CancellationDetails.getErrorDetails.
     * @member PropertyId.SpeechServiceResponse_JsonErrorDetails
     */
    SpeechServiceResponse_JsonErrorDetails,

    /**
     * The cancellation reason. Currently unused.
     * @member PropertyId.CancellationDetails_Reason
     */
    CancellationDetails_Reason,

    /**
     * The cancellation text. Currently unused.
     * @member PropertyId.CancellationDetails_ReasonText
     */
    CancellationDetails_ReasonText,

    /**
     * The Cancellation detailed text. Currently unused.
     * @member PropertyId.CancellationDetails_ReasonDetailedText
     */
    CancellationDetails_ReasonDetailedText,

    /**
     * The Language Understanding Service response output (in JSON format). Available via @see IntentRecognitionResult.Properties.
     * @member PropertyId.LanguageUnderstandingServiceResponse_JsonResult
     */
    LanguageUnderstandingServiceResponse_JsonResult,
}
