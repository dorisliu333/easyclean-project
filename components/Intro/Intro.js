import React, { Component } from 'react';
import './Intro.css';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <>
        <div>
          <div className="text">
            <div className="circle">
              <svg width="60" height="60" viewBox="0 0 24 24">
                {/* eslint-disable-next-line max-len */}
                <path d="M15.777887818 10.9l-.38-.47a.76.76 0 00-.58-.28h-1.46v-2h.71a3.63 3.63 0 003.8-3.44 3.64 3.64 0 00-3.79-3.45H6.55A.76.76 0 005.8 2v1.66a1.87 1.87 0 001.93 1.79A1.37 1.37 0 019.2 6.67v.73a.75.75 0 00.75.75h1.31v2H9.78a.76.76 0 00-.58.28l-.38.47a14.28 14.28 0 00-3.12 8.89 3 3 0 003 3h6.66a3 3 0 003-3 14.28 14.28 0 00-3.18-8.89zM7.73 4c-.25 0-.43-.15-.43-.29v-.96h6.18a2.15 2.15 0 012.29 2 2.14 2.14 0 01-2.3 1.94H10.7A2.86 2.86 0 007.73 4zm7.6 17.3H8.67a1.47 1.47 0 01-1.47-1.51 12.74 12.74 0 012.8-7.95l.15-.19h1.12v4a1.13 1.13 0 01-.33.79l-.75.75a.75.75 0 000 1.06.75.75 0 001.06 0l.75-.75a2.61 2.61 0 00.77-1.85v-4h1.1l.15.19a12.74 12.74 0 012.79 8 1.47 1.47 0 01-1.48 1.41z" />
              </svg>
            </div>

            <div>{title}</div>
            <p>
              <a className="btn btn-secondary" href=" ">
                View details &raquo;
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Intro;
