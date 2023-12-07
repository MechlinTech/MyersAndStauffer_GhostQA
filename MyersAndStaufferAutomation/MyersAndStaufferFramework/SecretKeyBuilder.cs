using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
