import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = forbidExtraProps({
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  canNavPrev: PropTypes.bool,
  canNavNext: PropTypes.bool,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},
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
  } = props;

  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
    'DayPickerNavigation__prev--disabled': !canNavPrev,
  });
  const nextClassNames = cx('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
    'DayPickerNavigation__next--disabled': !canNavNext,
  });

  return (
    <div className={navClassNames}>
      {!isVerticalScrollable &&
        <span
          className={prevClassNames}
          onClick={canNavPrev && onPrevMonthClick}
        >
          {navPrevIcon}
        </span>
      }

      <span
        className={nextClassNames}
        onClick={canNavNext && onNextMonthClick}
      >
        {navNextIcon}
      </span>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
