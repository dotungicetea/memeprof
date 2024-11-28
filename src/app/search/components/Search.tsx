"use client";

import useBackButton from "@/components/BackButton/useBackButton";
import { Box } from "@/components/Box";
import Button from "@/components/Button";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import TextField from "@/packages/mini-app/components/form/text-field/TextField";
import GlobalLoader from "@/packages/mini-app/components/global-locker/GlobalLoader";
import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./search.module.scss";

const cn = classNames.bind(styles);

type Props = {};

const Search = (props: Props) => {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([] as any[]);

  const router = useRouter();

  const onSearch = async () => {
    if (!value) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResults([{ id: 1 }, { id: 2 }]);
    }, 1000);
  };

  useBackButton({
    isBackable: true,
    onClick: router.back,
  });

  return (
    <Box className={cn("search")}>
      <TextField
        leftIcon="search"
        value={value}
        placeholder="Search"
        className={cn("search__input")}
        onChange={(val) => setValue(val)}
        loading={loading}
        rightActions={
          !!results.length && !!value ? (
            <Button
              variant="text"
              className={cn("search__action")}
              onClick={() => {
                setResults([]);
                setValue("");
              }}
            >
              Clear
            </Button>
          ) : (
            <Button
              variant="text"
              className={cn("search__action")}
              onClick={onSearch}
            >
              Search
            </Button>
          )
        }
      />

      <Tabs.Root
        value={filter}
        defaultValue="all"
        onValueChange={(val) => setFilter(val)}
      >
        <Tabs.List className={cn("search__tablist")}>
          <Tabs.Trigger className={cn("search__tablist--tab")} value="all">
            All
          </Tabs.Trigger>
          <Tabs.Trigger className={cn("search__tablist--tab")} value="users">
            Users
          </Tabs.Trigger>
          <Tabs.Trigger className={cn("search__tablist--tab")} value="memes">
            Memes
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className={cn("search__tabcontent")} value="all">
          {loading ? <GlobalLoader /> : <ComingSoon />}
        </Tabs.Content>
        <Tabs.Content className={cn("search__tabcontent")} value="users">
          {loading ? <GlobalLoader /> : <ComingSoon />}
        </Tabs.Content>
        <Tabs.Content className={cn("search__tabcontent")} value="memes">
          {loading ? <GlobalLoader /> : <ComingSoon />}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Search;
