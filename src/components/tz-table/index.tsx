import { Table, TableProps } from "antd";
import classNames from "classnames";
import { useMemo } from "react";
import NoData from "../no-data";

export interface TzTableProps extends TableProps<any> {
  ref?: any;
}
export const TzTable = (props: TzTableProps) => {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: classNames("tz-aisoc-table"),
      locale: { emptyText: <NoData /> },
    };
  }, [props]);
  return <Table {...realProps} />;
};
export default TzTable;
