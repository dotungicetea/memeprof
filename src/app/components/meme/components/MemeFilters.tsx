"use client";

import Chip from "@/components/Chip";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames/bind";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./meme-filters.module.scss";
import { FormattedMessage } from "react-intl";

const cn = classNames.bind(styles);

const filters = [
  { value: "memeFeed.trending" as const },
  { value: "memeFeed.following" as const },
  { value: "memeFeed.liked" as const },
];

const MemeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams?.get("filter");

  useEffect(() => {
    if (!currentFilter) {
      router.replace(`${pathname}?filter=trending`);
    }
  }, [currentFilter, pathname, router]);

  return (
    <Flex className={cn("filters")}>
      <Chip isActive={true}>All</Chip>
      <Chip isActive={false}>Recent</Chip>
      {filters.map((f) => (
        <Chip
          key={f.value}
          isActive={currentFilter === f.value}
          onClick={() => router.push(`${pathname}?filter=${f.value}`)}
        >
          <FormattedMessage id={f.value} />
        </Chip>
      ))}
    </Flex>
  );
};

export default MemeFilters;
