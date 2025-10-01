import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

type TCarouselOptions = {
  loop: boolean;
};

export function useCarousel(options: TCarouselOptions) {
  const [sliderRef, sliderApi] = useEmblaCarousel(options);

  const sliderPrev = React.useCallback(() => {
    if (sliderApi) sliderApi.scrollPrev();
  }, [sliderApi]);

  const sliderNext = React.useCallback(() => {
    if (sliderApi) sliderApi.scrollNext();
  }, [sliderApi]);

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onSelect = React.useCallback((sliderApi: any) => {
    setPrevBtnDisabled(!sliderApi.canScrollPrev());
    setNextBtnDisabled(!sliderApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!sliderApi) return;

    onSelect(sliderApi);
    sliderApi.on("reInit", onSelect).on("select", onSelect);
  }, [sliderApi, onSelect]);

  return {
    sliderRef,
    sliderPrev,
    prevBtnDisabled,
    sliderNext,
    nextBtnDisabled,
  };
}
