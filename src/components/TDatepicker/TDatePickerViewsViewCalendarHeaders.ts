import Vue, { CreateElement, VNode } from 'vue';
import { createDateFormatter } from '@/utils/dates';
import { english } from '@/l10n/default';

const TDatePickerViewsViewCalendarHeaders = Vue.extend({
  name: 'TDatePickerViewsViewCalendarHeaders',

  props: {
    locale: {
      type: String,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      dateFormatter: createDateFormatter({ l10n: english }),
    };
  },

  computed: {
    weekDays(): string[] {
      return Array.from({ length: 7 }, (_x, i) => {
        const weekDay = this.weekStart + i;
        if (weekDay >= 7) {
          return weekDay - 7;
        }

        return weekDay;
      }).map(this.getWeekDayName);
    },

  },

  methods: {
    getWeekDayName(weekDay: number): string {
      const date = new Date();
      date.setDate((date.getDate() + (7 + weekDay - date.getDay())) % 7);
      return this.dateFormatter(date, 'D');
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: this.getElementCssClass('weekDayWrapper'),
      },
      this.weekDays.map((weekDayName: string) => createElement(
        'span',
        {
          class: this.getElementCssClass('weekDay'),
        },
        weekDayName,
      )),
    );
  },

});

export default TDatePickerViewsViewCalendarHeaders;
