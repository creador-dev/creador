import React from 'react'
import { Provider, ClapButton } from "@lyket/react";

export default function PostClapButton({ postId }) {
    return (
        <div className="hoverable clap-button">
            <Provider 
                apiKey="pt_b4b176b6f205c6c78e47b75f26f43f" 
                recaptchaSiteKey="6LegDBEcAAAAAAGk8YZNJ3ir0j7oWyj-Z-WMlKjQ"
            >
                <ClapButton
                    namespace="post"
                    id={postId}
                    component={ClapButton.templates.Medium}
                />
            </Provider>
        </div>
    )
}
