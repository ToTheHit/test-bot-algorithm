import React, { useEffect, useState, useRef } from 'react';
import {
  ControlledMenu, MenuItem, useMenuState, MenuGroup
} from '@szhsin/react-menu';
import { observer } from 'mobx-react';
import EditorStore from '../../../../mobx/EditorStore';
import './controlledMenu.less';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const EditorMenuContext = observer(function EditorMenuContext(props) {
  const {
    addNode,
    values
  } = props;
  const {
    toggleMenu: toggle,
    menu
  } = EditorStore;
  const [menuProps, toggleMenu] = useMenuState({
    transition: { open: true },
    transitionTimeout: 100
  });
  const [filter, setFilter] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (menu.type === 'editor') {
      toggleMenu(menu.isToggled);
    }
  }, [menu.isToggled]);

  const closeMenu = () => {
    toggle(false);
    setFilter('');
    toggleMenu(false);
  };
  const addNodeOnCanvas = event => {
    addNode(event.value, {
      clientX: menu.anchorPoint.x,
      clientY: menu.anchorPoint.y
    });
  };
  const onKeyDown = () => {
    if (!isSearchFocused) {
      inputRef.current.focus();
      setIsSearchFocused(true);
    }
  };
  const onInputBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <ControlledMenu
      {...menuProps}
      anchorPoint={{ x: menu.anchorPoint.x - 10, y: menu.anchorPoint.y - 10 }}
      onClose={() => closeMenu()}
      overflow="auto"
      setDownOverflow
      position="anchor"
      boundingBoxPadding="10"
      onKeyDown={onKeyDown}
      onBlur={onInputBlur}
      onContextMenu={e => {
        e.preventDefault();
      }}
      className="controlledMenu"
    >
      <li className="szh-menu__item">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </li>

      <MenuGroup takeOverflow style={{ maxHeight: '300px', overflow: 'auto' }}>
        {
        values.filter(modelName => modelName.toUpperCase()
          .includes(filter.trim()
            .toUpperCase()))
          .map(modelName => (
            <MenuItem
              value={modelName}
              onClick={addNodeOnCanvas}
              key={modelName}
            >
              {modelName}
            </MenuItem>
          ))
      }
      </MenuGroup>
    </ControlledMenu>
  );
});

EditorMenuContext.propTypes = {};

export default EditorMenuContext;
