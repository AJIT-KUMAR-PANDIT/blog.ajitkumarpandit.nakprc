import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial, PageBlocksTestimonialTestimonials } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '../layout/section';

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-[1024px] px-4 sm:px-5">
        {/* iOS section header */}
        <div className="mb-3 ml-3.5">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-[22px] font-bold tracking-tight text-[var(--ios-text-primary)]" style={{ WebkitFontSmoothing: "antialiased", letterSpacing: "-0.025em" }}>
            {data.title}
          </h2>
        </div>

        {/* Grouped container */}
        <div className="section-card p-0 overflow-hidden" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}>
          {data.testimonials?.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial!} isLast={index === data.testimonials!.length - 1} />
          ))}
        </div>

        <p data-tina-field={tinaField(data, 'description')} className="mt-3 ml-3.5 text-[15px] leading-relaxed text-[var(--ios-text-secondary)]">
          {data.description}
        </p>
      </div>
    </Section>
  );
};

const TestimonialCard = ({ testimonial, isLast }: { testimonial: PageBlocksTestimonialTestimonials; isLast: boolean }) => (
  <div className={!isLast ? 'border-b border-[var(--ios-separator)]' : ''}>
    <div className="grouped-list-item !py-3">
      <Avatar className="size-9 shrink-0 border border-[var(--ios-separator)]" data-tina-field={tinaField(testimonial, 'avatar')}>
        {testimonial.avatar && (
          <AvatarImage alt={testimonial.author!} src={testimonial.avatar} loading="lazy" width="120" height="120" />
        )}
        <AvatarFallback className="text-[13px] font-semibold text-[var(--ios-text-tertiary)]">
          {testimonial.author!.split(" ").map((word) => word[0]).join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h3 className="text-[17px] font-semibold tracking-tight text-[var(--ios-text-primary)]" data-tina-field={tinaField(testimonial, 'author')}>{testimonial.author}</h3>
        <span className="text-[14px] text-[var(--ios-blue)] font-medium" data-tina-field={tinaField(testimonial, 'role')}>{testimonial.role}</span>
        <blockquote className="mt-2 text-[15px] leading-relaxed text-[var(--ios-text-secondary)] italic" data-tina-field={tinaField(testimonial, 'quote')}>
          "{testimonial.quote}"
        </blockquote>
      </div>
    </div>
  </div>
);

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      testimonials: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
      ],
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
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      list: true,
      label: "Testimonials",
      name: "testimonials",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.author}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        }
      ],
    },
  ],
};
