import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SearchIcon, XIcon } from "@/components/ui/icons";
import { MONTH_NAMES } from "@/lib/constants";
import {
  hasActiveFilters,
  industryToParam,
  paramToIndustry,
} from "@/lib/filters";
import { INDUSTRIES, type EventFilters as Filters } from "@/types/event";

const INDUSTRY_OPTIONS = INDUSTRIES.map((industry) => ({
  value: industryToParam(industry),
  label: industry,
}));

const MONTH_OPTIONS = MONTH_NAMES.map((name, index) => ({
  value: String(index + 1),
  label: name,
}));

interface EventFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
}

/**
 * Search box, industry dropdown, month dropdown and Clear button.
 *
 * It is a controlled component: it owns no state and knows nothing about the
 * URL or the event list. The parent passes the current filters and receives
 * every change, which keeps this component reusable and easy to test.
 *
 * The inputs have `name`s and the form is a plain GET form, so the filters
 * also work (via a normal page load) if JavaScript hasn't loaded yet.
 */
export function EventFilters({ filters, onChange, onClear }: EventFiltersProps) {
  return (
    <form
      role="search"
      aria-label="Filter events"
      method="get"
      action="/events"
      // With JavaScript the filters apply live, so Enter shouldn't reload.
      onSubmit={(event) => event.preventDefault()}
      className="grid gap-4 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 sm:p-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_15rem_15rem_auto] lg:items-end"
    >
      <div className="md:col-span-2 lg:col-span-1">
        <Input
          id="event-search"
          name="q"
          type="search"
          label="Search by event name"
          placeholder="e.g. Gulfood, PACK EXPO, MEDICA"
          icon={<SearchIcon className="size-5" />}
          value={filters.q}
          onChange={(event) => onChange({ ...filters, q: event.target.value })}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          maxLength={100}
        />
      </div>

      <Select
        id="event-industry"
        name="industry"
        label="Industry"
        placeholder="All industries"
        options={INDUSTRY_OPTIONS}
        value={filters.industry ? industryToParam(filters.industry) : ""}
        onChange={(value) =>
          onChange({ ...filters, industry: paramToIndustry(value) })
        }
      />

      <Select
        id="event-month"
        name="month"
        label="Month"
        placeholder="All months"
        options={MONTH_OPTIONS}
        value={filters.month === null ? "" : String(filters.month)}
        onChange={(value) =>
          onChange({ ...filters, month: value ? Number(value) : null })
        }
      />

      <Button
        variant="secondary"
        onClick={onClear}
        disabled={!hasActiveFilters(filters)}
        className="w-full md:col-span-2 lg:col-span-1 lg:w-auto"
      >
        <XIcon className="size-4" />
        Clear Filters
      </Button>
    </form>
  );
}
