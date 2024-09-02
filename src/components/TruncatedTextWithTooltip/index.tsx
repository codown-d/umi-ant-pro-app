import { Tooltip, Typography } from "antd";
import { useOverflowTooltip } from "../../hooks";
import TzTooltip from "../tz-tooltip";
const { Text } = Typography;
interface TruncatedTextWithTooltipProps {
  content: React.ReactNode;
}
const TruncatedTextWithTooltip = (props: TruncatedTextWithTooltipProps) => {
  let { content } = props;
  const { contentRef, isOverflow } = useOverflowTooltip(content);
  return (
    <TzTooltip title={isOverflow ? content : undefined}>
      <Text
        ellipsis
        ref={contentRef}
        style={{ display: "block", width: "100%" }}
      >
        {content}
      </Text>
    </TzTooltip>
  );
};
export default TruncatedTextWithTooltip;
