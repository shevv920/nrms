export type BirdId = string & { readonly birdId: unique symbol };

export type Bird = {
  id: BirdId;
  name: string;
  color: string;
}
