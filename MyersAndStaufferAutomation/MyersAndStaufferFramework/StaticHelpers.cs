using System.Collections.Generic;

namespace MyersAndStaufferFramework
{
    public static class StaticHelpers
    {
        public static int? IntSafeParse(string value)
        {
            int result;

            if (int.TryParse(value, out result))
                return result;

            return null;
        }

        public static int SafeParse(string val, int defaultValue)
        {
            int result;
            return int.TryParse(val, out result) ? result : defaultValue;
        }

        public static T Max<T>(T first, T second)
        {
            if (Comparer<T>.Default.Compare(first, second) > 0)
                return first;
            return second;
        }
    }
}
