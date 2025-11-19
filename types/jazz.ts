export interface Album {
  id: string;
  artist: string;
  title: string;
  year: string;
  color: string;
  connection: string;
  linerNotes: string; // Now focused on sonic texture
  personnel: string;  // New field: "Miles Davis (tpt), Bill Evans (p)..."
  tracks: string[];
}