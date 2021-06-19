import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './yt_video.less';
import classNames from '../../../lib/classNames';

const YT_video = (props) => {
  const [linkState, setLinkState] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [iframe, setIframe] = useState(null);
  const {
    AllowFullScreen, className, AutoPlay, PreviewImgAlt, VideoID,
  } = props;
  function createIframe() {
    return (
      <iframe
        className="YT_video__media"
        allowFullScreen={AllowFullScreen}
        allow={'autoplay'}
        src={`https://www.youtube.com/embed/${VideoID}/?rel=0&showinfo=0&autoplay=1`}
      />
    );
  }


  function play() {
    setLinkState(false);
    setButtonState(false);
    setIframe(createIframe());
  }

  useEffect(() => {
    if (AutoPlay) {
      play();
    }
  }, []);

  return (
    <div
      className={classNames('YT_video', { 'YT_video--enabled': !iframe }, { [className]: className })}
      onClick={() => play()}
    >
      {linkState
                && (
                <div className="YT_video__link">
                  <picture>
                    <source srcSet={`https://i.ytimg.com/vi_webp/${VideoID}/maxresdefault.webp`} type="image/webp" />
                    <img
                      className="YT_video__media"
                      src={`https://i.ytimg.com/vi/${VideoID}/maxresdefault.jpg`}
                      alt={PreviewImgAlt}
                    />
                  </picture>
                </div>
                )}

      {buttonState
            && (
            <button className="YT_video__button" type="button" aria-label="Запустить видео">
              <svg width="68" height="48" viewBox="0 0 68 48">
                <path
                  className="YT_video__button-shape"
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                />
                <path className="YT_video__button-icon" d="M 45,24 27,14 27,34" />
              </svg>
            </button>
            )}

      {iframe}
    </div>
  );
};

YT_video.propTypes = {
  VideoID: PropTypes.string.isRequired,
  AutoPlay: PropTypes.bool,
  PreviewImgAlt: PropTypes.string,
  AllowFullScreen: PropTypes.bool,
  className: PropTypes.string,
};

YT_video.defaultProps = {
  AutoPlay: false,
  PreviewImgAlt: 'Video from YouTube',
  AllowFullScreen: true,
  className: null,
};

export default YT_video;
