'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostQuery } from '@/tina/__generated__/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';
import ErrorBoundary from '@/components/error-boundary';
import { components } from '@/components/mdx-components';

interface ClientPostProps {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function PostClientPage(props: ClientPostProps) {
  const { data } = useTina({ ...props });
  const post = data.post;

  const date = new Date(post.date!);
  const formattedDate = !isNaN(date.getTime()) ? format(date, 'MMMM dd, yyyy') : '';

  return (
    <ErrorBoundary>
      {/* Post hero image with blur backdrop */}
      {post.heroImg && (
        <div className="relative mx-auto max-w-[1024px] px-4 sm:px-5 pt-2">
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--ios-separator)] shadow-lg" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 4px 16px rgba(0,0,0,0.08)' }}>
            {/* Blur backdrop */}
            <Image
              src={post.heroImg}
              alt=""
              fill
              className="absolute inset-0 blur-2xl brightness-[0.3] scale-110"
              aria-hidden="true"
              priority
            />
            <Image
              priority={true}
              src={post.heroImg}
              alt={post.title}
              width={1200}
              height={630}
              className="relative z-10 w-full h-auto rounded-[20px]"
            />
          </div>
        </div>
      )}

      {/* Author & date in iOS grouped list */}
      <div className="mx-auto max-w-[680px] px-4 sm:px-5 mt-6 mb-6">
        <div className="section-card p-0 overflow-hidden" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}>
          {/* Author row */}
          {post.author && (
            <div className="grouped-list-item !py-3">
              <Avatar className="size-10 shrink-0 border border-[var(--ios-separator)]">
                {post.author.avatar && (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} className="rounded-full" />
                )}
                <AvatarFallback>
                  <UserRound size={16} strokeWidth={2} className="opacity-50 text-[var(--ios-text-quaternary)]" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p data-tina-field={tinaField(post.author, 'name')} className="text-[17px] font-semibold text-[var(--ios-text-primary)] leading-snug tracking-tight" style={{ WebkitFontSmoothing: "antialiased" }}>
                  {post.author.name}
                </p>
                <p className="text-[14px] text-[var(--ios-text-tertiary)]">Author</p>
              </div>
            </div>
          )}

          {/* Date row */}
          <div className="grouped-list-item !py-3">
            <div className="shrink-0 flex items-center justify-center size-[36px] rounded-xl bg-[var(--ios-blue)]/12 text-[var(--ios-blue)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M6 3V2h2v1h6V2h2v1h1a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h1zm0 6v9a1 1 0 001 1h12a1 1 0 001-1V9H6zm7 2l3 3-3 3-1.41-1.41L15.67 14H11v-2h4.67l-2.09-2.09L14 9z" />
              </svg>
            </div>
            <span className="text-[17px] text-[var(--ios-text-primary)] font-medium">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mx-auto max-w-[680px] px-4 sm:px-5 mb-4">
        <h1 data-tina-field={tinaField(post, 'title')} className="font-bold tracking-tighter text-[32px] leading-none md:text-[40px]" style={{ WebkitFontSmoothing: "antialiased", letterSpacing: "-0.035em" }}>
          {post.title}
        </h1>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[680px] px-4 sm:px-5 pb-24">
        <article className="text-[17px] leading-relaxed tracking-tight text-[var(--ios-text-primary)]" style={{ WebkitFontSmoothing: "antialiased" }}>
          <TinaMarkdown
            data-tina-field={tinaField(post, '_body')}
            content={post._body}
            components={{
              ...components,
            }}
          />
        </article>
      </div>
    </ErrorBoundary>
  );
}
