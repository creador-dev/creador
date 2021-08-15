const React = require("react")

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script 
        data-name="BMC-Widget" 
        data-cfasync="false" 
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" 
        data-id="creador.dev" 
        data-description="Support me on Buy me a coffee!" 
        data-message="Buy me a coffee" 
        data-color="#F9A826" 
        data-position="Right" 
        data-x_margin="20" 
        data-y_margin="20">
    </script>
  ])
}