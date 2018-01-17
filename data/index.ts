import fetchData, { LoadResult } from "./fetch";
import * as fs from "fs";
import * as path from "path";
import { DataProps as HomeDataProps } from "../src/app/containers/home";
import { paginate } from "./paginate";

(async function() {
  const data = await fetchData();

  const paginatedEvents = paginate(
    data.calendar.events,
    hash => `/data/event-${hash}.json`,
    4
  );
  const paginatedGallery = paginate(
    data.showcase.gallery,
    hash => `/data/project-${hash}.json`,
    4
  );
  const paginatedExperiments = paginate(
    data.showcase.experiments,
    hash => `/data/project-${hash}.json`,
    4
  );
  const paginatedCaseStudies = paginate(
    data.showcase.caseStudies,
    hash => `/data/case-study-${hash}.json`,
    4
  );

  const result = {
    ...data,
    calendar: {
      events: paginatedEvents[0]
    },
    showcase: {
      gallery: paginatedGallery[0],
      experiments: paginatedExperiments[0],
      caseStudies: paginatedCaseStudies[0]
    }
  };

  const filepath = path.resolve(__dirname, "dato-dump.json");
  fs.writeFileSync(filepath, JSON.stringify(data, null, 4));

  fs.writeFileSync(
    path.resolve(__dirname, "home-dataprops.json"),
    JSON.stringify(result, null, 4)
  );

  [
    paginatedEvents,
    paginatedGallery,
    paginatedExperiments,
    paginatedCaseStudies
  ].forEach(paginatedData => {
    (paginatedData as { current: string }[]).forEach(page => {
      const filepath = path.resolve(path.join("public", page.current));
      fs.writeFileSync(filepath, JSON.stringify(page, null, 4));
    });
  });
})();

process.on("unhandledRejection", e => {
  throw e;
});