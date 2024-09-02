import styled from "styled-components";
import { Tooltip, TooltipProps } from "antd";
import { useMemo } from "react";
import React from "react";
export declare type TzTooltipProps = TooltipProps;
export const TzTooltip = (props: TzTooltipProps) => {
  const realProps = useMemo(() => {
    return {
      destroyTooltipOnHide: { keepParent: false },
      ...props,
      zIndex: 9999999999,
    };
  }, [props]);
  return <Tooltip {...realProps} />;
};
export default TzTooltip;
