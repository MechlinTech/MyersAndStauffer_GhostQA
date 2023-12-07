using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace MyersAndStaufferFramework
{
    public static class XmlDocumentExtensions
    {
        public static void Redact(this XmlDocument xmlDoc, string tagName)
        {
            XmlNodeList matchingNodes = xmlDoc.GetElementsByTagName(tagName);

            foreach (XmlNode node in matchingNodes)
            {
                node.InnerText = "******";
            }
        }
    }
}
