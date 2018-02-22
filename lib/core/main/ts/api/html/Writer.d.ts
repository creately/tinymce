export default function (settings?: any): {
    start(name: string, attrs?: {
        [name: string]: string;
    }[], empty?: boolean): void;
    end(name: string): void;
    text(text: string, raw?: boolean): void;
    cdata(text: string): void;
    comment(text: string): void;
    pi(name: string, text: string): void;
    doctype(text: string): void;
    reset(): void;
    getContent(): string;
};
