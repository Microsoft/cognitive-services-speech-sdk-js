// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { AudioStreamFormat } from "../sdk/Exports";

export interface IAudioDestination {
    id(): string;
    write(buffer: ArrayBuffer): void;
    format: AudioStreamFormat;
    close(): void;
}
