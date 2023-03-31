import React from 'react';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function Extra(props) {
  const { _extra } = props;

  return (
    <>
      {_extra.text && (
        <div
          className="extra__text"
          dangerouslySetInnerHTML={{ __html: compile(_extra.text) }}
        ></div>
      )}

      {_extra._items.length > 0 && (
        <div className="extra__items">
          {_extra._items.map(({ title, body, _graphic, _classes }, index) => (
            <div key={index} className={classes(['extra__item', _classes])}>
              {title && (
                <div className="extra__item-title">
                  <div
                    className="extra__item-title-inner"
                    dangerouslySetInnerHTML={{ __html: compile(title) }}
                  ></div>
                </div>
              )}
              {body && (
                <div className="extra__item__body">
                  <div
                    className="extra__item__body-inner"
                    dangerouslySetInnerHTML={{ __html: compile(body) }}
                  ></div>
                </div>
              )}
              {_graphic && (
                <templates.image
                  {..._graphic}
                  classNamePrefixes={['extra__extension-item']}
                  attributionClassNamePrefixes={['component', 'extra__extension']}
                />
              )}
            </div>
          ))}
        </div>
      )}

    </>
  );
}
