export class Coordinates {
    public static MIN_LATITUDE = -90.0;
    public static MAX_LATITUDE = 90.0;
    public static MIN_ALTITUDE = -180.0;
    public static MAX_ALTITUDE = 180.0;

    constructor(
        public latitude: number,
        public longitude: number
    ) {}
}
