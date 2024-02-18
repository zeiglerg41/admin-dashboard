import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";

const UpcomingEvents = () => {
  // Define which list to use and what data to return
  const { data, isLoading} = useList({
    //hook by refine that allows you to fetch data from API
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
    meta: {
      // need to point to graphql query that returns all events
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px", // Apply padding directly to the title content
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      <div style={{ padding: "0 1rem" }}>
        {isLoading ? (
          <List
            itemLayout="horizontal"
            dataSource={Array.from({ length: 5 }).map((_, index) => ({
              id: index,
            }))}
            renderItem={() => <UpcomingEventsSkeleton />}
          ></List>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={data?.data || []}
            renderItem={(item) => {
              const renderDate = getDate(item.startDate, item.endDate);

              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Badge color={item.color} />}
                    title={<Text size="xs">{renderDate}</Text>}
                    description={
                      <Text ellipsis={{ tooltip: true }} strong>
                        {item.title}
                      </Text>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}

        {!isLoading && data?.data?.length === 0 && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "220px",
            }}
          >
            No Upcoming Events
          </span>
        )}
      </div>
    </Card>
  );
};

export default UpcomingEvents;
