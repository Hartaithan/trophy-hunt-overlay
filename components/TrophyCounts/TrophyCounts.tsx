import type { FC } from "react";
import type { TrophyCounts as Counts, TrophyType } from "@/models/trophy";
import type { FlexProps } from "@mantine/core";
import { Flex, Text } from "@mantine/core";
import { IconAlignRight, IconTrophy } from "@tabler/icons-react";
import { trophyColors } from "@/constants/trophy";

interface Props extends FlexProps {
  counts: Counts | null;
  withTotal?: boolean;
}

interface CountProps extends FlexProps {
  type: TrophyType | "total";
  count: number | null;
}

const Count: FC<CountProps> = (props) => {
  const { type, count, ...rest } = props;
  if (!count) return null;
  const Icon = type === "total" ? IconAlignRight : IconTrophy;
  return (
    <Flex gap={4} align="center" justify="center" {...rest}>
      <Icon color={trophyColors[type]} />
      <Text fw="bold" ta="center" c={trophyColors[type]}>
        {count}
      </Text>
    </Flex>
  );
};

const TrophyCounts: FC<Props> = (props) => {
  const { counts, withTotal = true, ...rest } = props;
  if (!counts) return null;
  return (
    <Flex gap="sm" {...rest}>
      <Count type="platinum" count={counts.platinum} />
      <Count type="gold" count={counts.gold} />
      <Count type="silver" count={counts.silver} />
      <Count type="bronze" count={counts.bronze} />
      {withTotal && <Count type="total" count={counts.total} />}
    </Flex>
  );
};

export default TrophyCounts;
