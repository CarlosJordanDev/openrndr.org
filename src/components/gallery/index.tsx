import * as React from "react";

import "./style.css";

import { Project as ProjectType } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";
import { calcColumnUnit } from "../../utils/index";

interface IProps extends PageProps<ProjectType> {
  title: string;
  className?: string;
  color: string;
  onLoadMore: () => void;
}

interface IState {
  numberOfColumns: number;
  isMobile: boolean;
  hasPendingTransitions: boolean;
}

class GalleryComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      numberOfColumns: 5,
      isMobile: false,
      hasPendingTransitions: false
    };
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.setState({
      numberOfColumns: window.innerWidth <= 1024 ? 3 : 5,
      isMobile: window.innerWidth < 768
    });
  };

  render() {
    const { data, title, className = "", hasNext, color, loading } = this.props;
    const { numberOfColumns } = this.state;

    return (
      <section className={`gallery`}>
        <h2 className={"gallery-title"}>{title}</h2>

        <div className={`grid ${className}`}>
          {data.map(item => {
            return (
              <GalleryItem
                open={false}
                data={item}
                isMobile={this.state.isMobile}
              />
            );
          })}
        </div>

        <div
          className={`load-more ${hasNext ? "" : "disabled"}`}
          style={{
            width: `calc(8 * ${calcColumnUnit(numberOfColumns)})`,
            color
          }}
        >
          <span
            style={{
              visibility: hasNext ? "initial" : "hidden"
            }}
            onClick={
              hasNext
                ? () => {
                    this.props.loadNext();
                    this.props.onLoadMore();
                  }
                : () => null
            }
          >
            <span>
              {loading ? (
                <img width="15px" src={"loading-black.gif"} />
              ) : (
                "MORE"
              )}
            </span>
          </span>
        </div>
      </section>
    );
  }
}

export const Gallery = withPagination(GalleryComponent);
