import { Tooltip, Typography } from "antd";
import { useOverflowTooltip } from "../../hooks";
const { Text } = Typography;
interface TruncatedTextWithTooltipProps {
  content: React.ReactNode;
}
const TruncatedTextWithTooltip = (props: TruncatedTextWithTooltipProps) => {
  let { content } = props;
  const { contentRef, isOverflow } = useOverflowTooltip(content);
  return (
    <Tooltip title={isOverflow ? content : undefined}>
      <Text
        ellipsis
        ref={contentRef}
        style={{ display: "block", width: "100%" }}
      >
        {content}
      </Text>
    </Tooltip>
  );
};
export default TruncatedTextWithTooltip;
