import Image from "next/image";
import type { ImageProps } from "next/image";
import type { FC } from "react";
import classes from "./GameImage.module.css";
import type { BoxProps } from "@mantine/core";
import { Box, Overlay } from "@mantine/core";
import clsx from "clsx";

interface Props extends BoxProps {
  src: string | undefined | null;
  title: string;
  isOverlay: boolean;
  imageProps?: Omit<ImageProps, "src" | "alt">;
}

const GameImage: FC<Props> = (props) => {
  const { className, src, title, isOverlay, imageProps } = props;
  const sizeProps = !imageProps ? { height: 56, width: 100 } : imageProps;
  if (!src) return null;
  return (
    <Box className={clsx(classes.wrapper, className)}>
      <Image
        className={classes.image}
        src={src}
        alt={`${title} image preview`}
        unoptimized
        {...sizeProps}
      />
      {isOverlay && (
        <>
          <Overlay
            zIndex={2}
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"
          />
          <Image
            className={classes.background}
            src={src}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`${title} image preview background`}
            unoptimized
          />
        </>
      )}
    </Box>
  );
};

export default GameImage;
