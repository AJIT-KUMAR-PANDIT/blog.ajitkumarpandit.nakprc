"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "../mdx-components";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-[1024px] px-4 sm:px-5">
        {/* iOS section header */}
        <div className="mb-3 ml-3.5">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="text-[22px] font-bold tracking-tight text-[var(--ios-text-primary)]"
            style={{ WebkitFontSmoothing: "antialiased", letterSpacing: "-0.025em" }}
          >
            {data.title}
          </h2>
        </div>

        {/* Grouped card container */}
        <div className="section-card p-0 overflow-hidden" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}>
          {data.items && data.items.map(function (block, i) {
            return <Feature key={i} {...block!} idx={i} total={data.items!.length} />;
          })}
        </div>

        <p data-tina-field={tinaField(data, 'description')} className="mt-3 ml-3.5 text-[15px] leading-relaxed text-[var(--ios-text-secondary)]">
          {data.description}
        </p>
      </div>
    </Section>
  )
}

const Feature: React.FC<PageBlocksFeaturesItems & { idx: number, total: number }> = (data) => {
  const isLast = data.idx === data.total - 1;
  return (
    <div className={isLast ? '' : 'border-b border-[var(--ios-separator)]'}>
      <div className="grouped-list-item !py-4">
        {/* Icon circle */}
        {data.icon && (
          <div className="shrink-0 flex items-center justify-center size-[36px] rounded-xl bg-[var(--ios-blue)]/12 text-[var(--ios-blue)] transition-transform duration-[300ms] ease-[var(--spring-damp)] group-active:scale-90">
            <Icon data={{ size: "medium", ...data.icon }} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            data-tina-field={tinaField(data, "title")}
            className="text-[17px] font-semibold tracking-tight text-[var(--ios-text-primary)]"
            style={{ WebkitFontSmoothing: "antialiased" }}
          >
            {data.title}
          </h3>
          <div className="mt-0.5 text-[14px] leading-relaxed text-[var(--ios-text-secondary)]">
            <TinaMarkdown
              data-tina-field={tinaField(data, "text")}
              content={data.text}
              components={components}
            />
          </div>
        </div>

        {/* Chevron */}
        <svg className="size-[17px] shrink-0 text-[var(--ios-text-quaternary)] transition-all duration-300 group-hover:text-[var(--ios-blue)] group-hover:translate-x-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    name: "Tina",
    color: "white",
    style: "float",
  }
};

export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
      ],
    },
  ],
};
