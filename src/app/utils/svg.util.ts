export const getGullWingPath = (
        totalHeight: number,
        totalWidth: number,
        curveHeight: number,
        curveWidth: number,
        tipHeight: number,
        tipWidth: number): string => {
    const horizontalSegmentWidth = (totalWidth - 2 * curveWidth - tipWidth * 2) / 2;
    return `M 0,${totalHeight}
    q 0,${-curveHeight} ${curveWidth},${-curveHeight}
    h ${horizontalSegmentWidth}
    q ${tipWidth / 2},0 ${tipWidth / 2},${-tipHeight}
    q 0,${tipHeight} ${tipWidth / 2},${tipHeight}
    h ${horizontalSegmentWidth}
    q ${curveWidth},0 ${curveWidth},${curveHeight}`;
};
