import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = {
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  canNavPrev: PropTypes.bool,
  canNavNext: PropTypes.bool,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  isRTL: PropTypes.bool,
};

const DefaultIcon = () => null;

const defaultProps = {
  navPrev: <DefaultIcon />,
  navNext: <DefaultIcon />,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,
  isRTL: false,
};

const blurNav = (e) => {
  e.currentTarget.blur();
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    canNavPrev,
    canNavNext,
    onPrevMonthClick,
    onNextMonthClick,
    orientation,
    phrases,
    isRTL,
  } = props;

  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = <DefaultIcon />;
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = <DefaultIcon />;
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
    'DayPickerNavigation__prev--rtl': isRTL,
    'DayPickerNavigation__prev--disabled': !canNavPrev,
  });
  const nextClassNames = cx('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
    'DayPickerNavigation__next--rtl': isRTL,
    'DayPickerNavigation__next--disabled': !canNavNext,
  });

  return (
    <div className={navClassNames}>
      {!isVerticalScrollable && (
        React.cloneElement(navPrevIcon, {
          type: 'button',
          'aria-label': phrases.jumpToPrevMonth,
          className: prevClassNames,
          onClick: canNavPrev && onPrevMonthClick,
          onMouseUp: blurNav,
        })
      )}

      {
        React.cloneElement(navNextIcon, {
          type: 'button',
          'aria-label': phrases.jumpToNextMonth,
          className: nextClassNames,
          onClick: canNavNext && onNextMonthClick,
          onMouseUp: blurNav,
        })
      }
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
