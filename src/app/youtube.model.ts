export class Youtube {
  constructor(
    public Actors: string,
    public kind: string,
    public etag: string,
    public nextPageToken: string,
    public regionCode: string,
    public pageInfo: {},
    public items: [
      {
        kind: string;
        etag: string;
        id: {
          kind: string;
          videoId: string;
        };
      }
    ]
  ) {}
}
