"use client";

import {
  Anchor,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import type { FC } from "react";
import classes from "./SignInForm.module.css";
import { useForm } from "@mantine/form";
import Link from "next/link";

const SignInForm: FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.info("values", values);
  });

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Flex className={classes.fields}>
        <TextInput
          label="Username"
          placeholder="Your username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Button variant="light" mt="sm" type="submit">
          Sign In!
        </Button>
      </Flex>
      <Text className={classes.message}>
        Do not have an account yet?&nbsp;
        <Anchor component={Link} href="/signUp">
          Sign Up!
        </Anchor>
      </Text>
    </form>
  );
};

export default SignInForm;
