using System;

namespace MyersAndStaufferFramework
{
    public class SecretKeyBuilder
    {
        public static string GetKey(Guid? guidKey = null)
        {
            guidKey = guidKey ?? Guid.NewGuid();
            return guidKey.ToString().Replace("-", "");
        }
    }
}