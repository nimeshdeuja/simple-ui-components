/// <reference types="react" />
interface Props {
    id: string;
    labelText?: string;
    feedbackText?: (e: string) => void | string | undefined;
    Uploaded: (e: File | string | null) => void;
    format?: 'file' | 'base64';
    clear?: Boolean;
}
declare const File: ({ id, labelText, feedbackText, Uploaded, format, clear }: Props) => JSX.Element;
export default File;
//# sourceMappingURL=File.d.ts.map