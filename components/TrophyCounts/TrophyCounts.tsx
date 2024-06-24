import type { FC } from "react";
import type { TrophyCounts as Counts, TrophyType } from "@/models/trophy";
import type { FlexProps, MantineSize } from "@mantine/core";
import { Flex, Text } from "@mantine/core";
import { IconListTree, IconTrophy } from "@tabler/icons-react";
import { trophyColors } from "@/constants/trophy";

interface Props extends FlexProps {
  counts: Counts | null;
  size?: MantineSize;
  withTotal?: boolean;
}

interface CountProps extends FlexProps {
  type: TrophyType | "total";
  count: number | null;
  size?: MantineSize;
}

const iconSizes: Record<MantineSize, number> = {
  xl: 32,
  lg: 28,
  md: 24,
  sm: 20,
  xs: 18,
};

const Count: FC<CountProps> = (props) => {
  const { type, count, size = "md", ...rest } = props;
  if (!count) return null;
  const Icon = type === "total" ? IconListTree : IconTrophy;
  return (
    <Flex gap={4} align="center" {...rest}>
      <Icon size={iconSizes[size]} color={trophyColors[type]} />
      <Text fw="bold" size={size} ta="center" c={trophyColors[type]}>
        {count}
      </Text>
    </Flex>
  );
};

const TrophyCounts: FC<Props> = (props) => {
  const { counts, size = "md", withTotal = true, ...rest } = props;
  if (!counts) return null;
  return (
    <Flex gap="sm" align="center" {...rest}>
      <Count type="platinum" count={counts.platinum} size={size} />
      <Count type="gold" count={counts.gold} size={size} />
      <Count type="silver" count={counts.silver} size={size} />
      <Count type="bronze" count={counts.bronze} size={size} />
      {withTotal && <Count type="total" count={counts.total} size={size} />}
    </Flex>
  );
};

export default TrophyCounts;
