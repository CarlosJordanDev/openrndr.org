import * as React from "react";
import { Fade, Slide } from "react-reveal";

import { IMediumPost } from "../../types";
import { TruncateText } from "../truncate-text/index";

interface IProps {
  data: IMediumPost;
  style?: React.CSSProperties;
  isMobile: boolean;
}

export class MediumPost extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { data, style = {} } = this.props;

    return (
      <Fade clear>
        <div
          className={"gallery-item"}
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className={"media-item"} itemType={"thumbnailUrl"}>
            {data.imageUrl && (
              <a href={data.link} target={"_blank"}>
                <img width="100%" src={data.imageUrl} />
              </a>
            )}
          </div>

          <div className={`item-info show-all`}>
            <a
              className={"project-metadata"}
              href={data.link}
              target={"_blank"}
            >
              <h3 className={"item-title"} itemType={"title"}>
                {data.title}
              </h3>
            </a>

            <div className={"blurb"} itemType={"description"}>
              <TruncateText active={true} text={data.blurb} />
              <a
                className={"read-more button"}
                href={data.link}
                target={"_blank"}
              >
                READ ON MEDIUM
              </a>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}
