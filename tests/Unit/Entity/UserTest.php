<?php

namespace App\Tests\Unit\Entity;

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    // First test!
    public function testItWorks(): void {
        self::assertEquals(expected:42, actual:42);
    }

    public function testItWorksTheSame(): void{
        self::assertSame(42,42,"42 est égal à 42");
    }

    public function testFirstFailedTest(): void {
        self::assertEquals(expected:42, actual:3);
    }
}