export interface Course {
  id: string;
  title: string;
  //this should be used to get the course from the route param
  //instead of using the document ID
  //Add it later because that might break a lot of things
  name?: string;
  description: string;
}
