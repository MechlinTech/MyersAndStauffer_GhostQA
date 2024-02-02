using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SeleniumTestReport.Helper;
using TestSeleniumReport.DBContext;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("AppDBContextConnection") ?? throw new InvalidOperationException("Connection string 'AppDBContextConnection' not found.");

builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AppDBContext>();

builder.Services.AddSingleton<DBHelper>();

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddControllersWithViews().AddRazorPagesOptions(options =>
{
    options.Conventions.AddAreaPageRoute("Identity", "/Account/Login", "");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();