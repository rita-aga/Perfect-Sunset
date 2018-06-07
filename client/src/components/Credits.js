import React from 'react';

class Credits extends React.Component {

  render() {
    
    return ( 
      <div className="footer">
      <p>Coded with ❤️ by <a href="https://rita.im">Rita Agafonova</a></p>  
      <p>Illustration by <a href="https://www.freepik.com/free-vector/beach-landscape-with-lighthouse-at-sunset_1184891.htm">Freepik</a></p>
      <p>Icons made by <a href="https://www.flaticon.com/authors/rns" title="RNS">RNS</a> from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a> licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
      <a href="https://darksky.net/poweredby/"><img src="img/darksky.png"/></a>
      </div>
    )
  }
}

export default Credits;