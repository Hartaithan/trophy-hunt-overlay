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
import classes from "./SignUpForm.module.css";
import { useForm } from "@mantine/form";
import Link from "next/link";
import type { SignUpForm as Form } from "@/models/auth";
import { signUp } from "@/actions/signUp";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { IconAlertOctagon, IconCheck } from "@tabler/icons-react";

const SignUpForm: FC = () => {
  const { push } = useRouter();
  const form = useForm<Form>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    const id = notifications.show({
      loading: true,
      title: "Signing up...",
      message: "It shouldn't take long, don't reload the page.",
      autoClose: false,
      withCloseButton: false,
    });
    const response = await signUp(values);
    if (response?.status === "success") {
      notifications.update({
        id,
        loading: false,
        title: "Success!",
        message: response?.message,
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
      push("/");
    } else {
      notifications.update({
        id,
        loading: false,
        color: "red",
        title: "Something went wrong!",
        message: response?.message,
        icon: <IconAlertOctagon size="1rem" />,
        withCloseButton: true,
      });
    }
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
          Sign Up!
        </Button>
      </Flex>
      <Text className={classes.message}>
        Already have an account?&nbsp;
        <Anchor component={Link} href="/signIn">
          Sign In!
        </Anchor>
      </Text>
    </form>
  );
};

export default SignUpForm;
