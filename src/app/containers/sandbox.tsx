import React from "react";
import SandboxComponentExample from "../components/sandbox-component-example";
import Section from "../components/section";
import { Image } from "src/types";
import Config from "../config";

const dummyImage: Image = {
  id: "0",
  itemType: "image",
  caption: "ಠ‿ಠ",
  createdAt: "",
  updatedAt: "",
  file: {
    alt: "",
    title: "",
    width: 100,
    height: 100,
    url: "https://wallpaperbrowse.com/media/images/750814.jpg"
  }
};

// export default (props: any) => {
//   return (
//     <div>
//       <SandboxComponentExample image={dummyImage} />
//     </div>
//   );
// };




export default (props: any) => {
  return (
    <div>
        { Config.sections.map((object, i) =>
            <Section key={i} title={object.title} ></Section>
        )}
    </div>
  );
};

