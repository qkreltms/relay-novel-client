import React from "react";

interface IProps {
    lang: string;
    setLocale: (lang: string) => void;
}

export class Router extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div></div>
        );
    }
}
