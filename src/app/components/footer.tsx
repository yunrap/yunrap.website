export default function Footer() {
  return (
    <footer className="bg-bg1 py-16">
      <div className="container mx-auto px-6 xl:px-8 2xl:px-[8rem]">
        {/* Copyright */}
        <div className="mt-12 border-t border-grey/20 pt-8">
          <p className="text-center text-sm text-grey">
            © {new Date().getFullYear()} Yunrap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
