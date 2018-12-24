# Microsoft Cognitive Services Speech SDK for JavaScript

The Microsoft Cognitive Services Speech SDK for JavaScript is the JavaScript version of the Microsoft Cognitive Services Speech SDK. An in-depth description of feature set, functionality, supported platforms, as well as installation options is available [here](https://aka.ms/csspeech).

This depot contains the source code and instructions for building the Microsoft Cognitive Services Speech SDK for JavaScript. Your are not required to go through the build process. We create prebuilt packages tuned for your use-cases. These are updated in regular intervals. The published packages are matching the [conceptual](https://aka.ms/csspeech) and [reference](https://aka.ms/csspeech/javascriptref) documentation.

The JavaScript versions of the Cognitive Services Speech SDK supports browser scenarios as well as the use in a Node.js environment. For the browser support you find the [QuickStart here](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/quickstart-js-browser). For the Node.js environment you find the [QuickStart here](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/quickstart-js-node), in addition a package is available from [npmjs](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk).

## Build the project

To build the project you need to install the required packages, and then run the actual build.

### Install the required packages

Installation of the required packages is required once in your enlistment. Our automated build restores the packages with the following command:

```
npm ci
```

This will install packages exactly matching the package configuration from `package-lock.json`.

In a development environment you can also use the following command:

```
npm install
```

### Run the build

Once the dependencies are installed run the build by

```
npm run build
```

or

```
npx gulp bundle
```

or

```
npx gulp compress
```

> Note: `npx` is packaged with NPM 5.2 or above. Update NPM / Node if you
> don't have it or install it globally with `npm install -g npx` (less
> preferable).

## Data / Telemetry

This project collects data and sends it to Microsoft to help monitor our
service performance and improve our products and services. Read the [Microsoft
Privacy Statement](https://aka.ms/csspeech/privacy) to learn more.

To disable telemetry, you can call the following API:

```javascript
// disable telemetry data
sdk.Recognizer.enableTelemetry(false);
```

This is a global setting and will disable telemetry for all recognizers
(already created or new recognizers).

We strongly recommend you keep telemetry enabled. With telemetry enabled you
transmit information about your platform (operating system and possibly, Speech
Service relevant information like microphone characteristics, etc.), and
information about the performance of the Speech Service (the time when you did
send data and when you received data). It can be used to tune the service,
monitor service performance and stability, and might help us to analyze
reported problems. Without telemetry enabled, it is not possible for us to do any
form of detailed analysis in case of a support request.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
